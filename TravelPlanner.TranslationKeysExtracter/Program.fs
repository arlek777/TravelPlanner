// Learn more about F# at http://fsharp.org
// See the 'F# Tutorial' project for more help.

open System
open System.IO
open System.Text
open System.Text.RegularExpressions

[<EntryPoint>]
let main argv = 
    let appFolderPath = @"C:\Users\nii\Documents\Visual Studio 2017\Projects\TravelPlanner\TravelPlanner.Web\ClientApp\app\"
    let getHtmlFilePathes = Directory.GetFiles (appFolderPath, "*.html", SearchOption.AllDirectories)

    let regexMatches pattern (input: string) =
        Regex.Matches(input, pattern)

    let getTranslationKeys (path: string) = 
        File.ReadAllText(path)
        |> regexMatches @"(?<=\blocalize="")[^""]*"
        |> List.map (fun m -> m
    0 // return an integer exit code
