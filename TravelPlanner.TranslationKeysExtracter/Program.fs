// Learn more about F# at http://fsharp.org
// See the 'F# Tutorial' project for more help.

open System
open System.IO
open System.Text
open System.Text.RegularExpressions
open System.Web.Script.Serialization

[<EntryPoint>]
let main argv = 
    let appFolderPath = @"C:\Users\Arlek\Source\Repos\TravelPlanner\TravelPlanner.Web\ClientApp\app\"
    let translationFilePath = @"C:\Users\Arlek\Source\Repos\TravelPlanner\TravelPlanner.Web\wwwroot\ru.json"

    let createTranslationObject path = 
        File.ReadAllText(path)
        |> (new JavaScriptSerializer()).DeserializeObject

    let writeTranslationKey (key:string) = 
        createTranslationObject translationFilePath
        |> Seq.ca

    let regexMatches pattern (input: string) =
        Regex.Matches(input, pattern)
        |> Seq.cast<Match>
        |> Seq.map(fun m -> m.Value)
        |> Seq.toArray

    let writeTranslationKeys files = 
        files
        |> Array.iter(fun f -> 
            File.ReadAllText(f)
            |> regexMatches @"(?<=\blocalize="")[^""]*"
            |> Array.iter (fun k -> writeTranslationKey k))

    writeTranslationKeys (Directory.GetFiles(appFolderPath, "*.html", SearchOption.AllDirectories))

    0
