using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TravelPlanner.BusinessLogic.Interfaces;
using TravelPlanner.BusinessLogic.Security;
using TravelPlanner.BusinessLogic.Services;
using TravelPlanner.DataAccess;
using TravelPlanner.DomainModel;
using TravelPlanner.Identity.IdentityManagers;
using TravelPlanner.Identity.IdentityStores;
using TravelPlanner.Identity.IdentityValidators;
using TravelPlanner.Web.Infrastructure;
using TravelPlanner.Web.Models;

namespace TravelPlanner.Web
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureDb(services);
            ConfigureIdentity(services);
            ConfigureSecurity(services);
            ConfigureBusinessLogic(services);

            services.AddMvc();
        }

        private void ConfigureDb(IServiceCollection services)
        {
            services.AddTransient<IGenericRepository, EntityFrameworkRepository>();
            services.AddScoped<DbContext>((provider) => new TravelPlannerDbContext(Configuration.GetConnectionString("DefaultConnection")));
            //DbInitializer.Initialize(context);
        }

        private void ConfigureBusinessLogic(IServiceCollection services)
        {
            services.AddTransient<ITripService, TripService>();
            services.AddTransient<ITripInviteService, TripInviteService>();
            services.AddTransient<INotificationService, TextFileNotificationService>();
        }

        private void ConfigureIdentity(IServiceCollection services)
        {
            services.AddTransient<IUserStore<User, Guid>, TravelPlannerUserStore>();
            services.AddTransient<UserManager<User, Guid>>((ctx) => new ApplicationUserManager(ctx.GetService<IUserStore<User, Guid>>())
            {
                PasswordValidator = new ApplicationPasswordValidator()
                {
                    RequiredLength = 6
                },
                UserValidator = new ApplicationUserValidator<User>(new ApplicationUserManager(ctx.GetService<IUserStore<User, Guid>>()))
                {
                    RequireUniqueEmail = true
                }
            });
        }

        private void ConfigureSecurity(IServiceCollection services)
        {
            services.Configure<JWTSettings>(Configuration.GetSection("JWTSettings"));
            services.AddTransient<IAuthTokenManager, JWTTokenManager>();

            services.Configure<IdentityOptions>(opts =>
            {
                opts.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = ctx =>
                    {
                        ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        return Task.FromResult("User Unauthorized");
                    }
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IOptions<JWTSettings> optionsAccessor)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            AutoMapperConfig.Configure();

            // Authentication JWT Settings
            var jwtSettings = optionsAccessor.Value;
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.SecretKey));

            var tokenValidationParameters = GetTokenValidationParameters(signingKey, jwtSettings);

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                TokenValidationParameters = tokenValidationParameters
            });

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AutomaticAuthenticate = false,
                AutomaticChallenge = false
            });

            // Standart MVC settings
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }

        private TokenValidationParameters GetTokenValidationParameters(SymmetricSecurityKey signingKey,
            JWTSettings jwtSettings)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                // Validate the JWT Issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = jwtSettings.Issuer,

                // Validate the JWT Audience (aud) claim
                ValidateAudience = true,
                ValidAudience = jwtSettings.Audience
            };
            return tokenValidationParameters;
        }
    }
}
