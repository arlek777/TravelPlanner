using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TravelPlanner.BusinessLogic.Interfaces;
using TravelPlanner.DomainModel;
using TravelPlanner.Web.Infrastructure;
using TravelPlanner.Web.Models;

namespace TravelPlanner.Web.Controllers
{
    [Authorize]
    public class MessageApiController : Controller
    {
        private readonly IMessageService _messageService;
        private readonly ChatMessageHandler _chatMessage;

        public MessageApiController(IMessageService messageService, ChatMessageHandler chatMessage)
        {
            _messageService = messageService;
            _chatMessage = chatMessage;
        }

        [HttpGet]
        [Route("api/message/getall")]
        public async Task<IActionResult> GetAll(int chatId)
        {
            var dbMessages = await _messageService.GetAll(chatId);
            return Ok(dbMessages.Select(Mapper.Map<Message, MessageModel>));
        }

        [HttpPost]
        [Route("api/message/send")]
        public async Task<IActionResult> Send([FromBody] MessageModel model)
        {
            var sentMessage = await _messageService.Send(Mapper.Map<Message>(model));
            await _chatMessage.SendMessageToAllAsync(JsonConvert.SerializeObject(sentMessage));
            return Ok();
        }
    }
}