# serve.ps1 - local server for the Team Task Manager site.
#
# No Python, no Node, no install: it uses only what ships with Windows.
#
#   powershell -ExecutionPolicy Bypass -File .\serve.ps1
#   powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8100
#
# Serves this folder at http://127.0.0.1:8099/ and opens the browser.
# Press Ctrl+C to stop.

param(
    [int]$Port = 8099
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$url = "http://127.0.0.1:$Port/index.html"

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.md'   = 'text/plain; charset=utf-8'
    '.txt'  = 'text/plain; charset=utf-8'
    '.svg'  = 'image/svg+xml'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.gif'  = 'image/gif'
    '.ico'  = 'image/x-icon'
    '.woff' = 'font/woff'
    '.woff2'= 'font/woff2'
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
try {
    $listener.Start()
}
catch {
    Write-Host ""
    Write-Host "  Could not listen on port $Port." -ForegroundColor Red
    Write-Host "  Something else is already using it - try: .\serve.ps1 -Port 8100" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

$ascii = [System.Text.Encoding]::ASCII

Write-Host ""
Write-Host "  Team Task Manager" -ForegroundColor Green
Write-Host "  $url" -ForegroundColor Cyan
Write-Host "  Serving: $root" -ForegroundColor DarkGray
Write-Host "  Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

Start-Process $url

while ($true) {
    $client = $listener.AcceptTcpClient()

    try {
        $stream = $client.GetStream()
        $reader = [System.IO.StreamReader]::new($stream, $ascii)

        # request line, e.g. "GET /css/style.css HTTP/1.1"
        $requestLine = $reader.ReadLine()
        if ([string]::IsNullOrWhiteSpace($requestLine)) { continue }

        # drop the headers
        while ($true) {
            $header = $reader.ReadLine()
            if ($null -eq $header -or $header -eq '') { break }
        }

        $parts = $requestLine.Split(' ')
        $rawPath = if ($parts.Length -ge 2) { $parts[1] } else { '/' }
        $rawPath = $rawPath.Split('?')[0].Split('#')[0]

        $path = [System.Uri]::UnescapeDataString($rawPath)
        if ($path -eq '/' -or $path -eq '') { $path = '/index.html' }

        $status = '404 Not Found'
        $type = 'text/plain; charset=utf-8'
        $body = $ascii.GetBytes('404 Not Found')

        $target = [System.IO.Path]::GetFullPath((Join-Path $root $path.TrimStart('/')))

        # never serve anything outside the project folder
        if ($target.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase) -and
            (Test-Path -LiteralPath $target -PathType Leaf)) {

            $body = [System.IO.File]::ReadAllBytes($target)
            $status = '200 OK'

            $ext = [System.IO.Path]::GetExtension($target).ToLowerInvariant()
            if ($mime.ContainsKey($ext)) { $type = $mime[$ext] }
            else { $type = 'application/octet-stream' }
        }

        $head = "HTTP/1.1 $status`r`n" +
                "Content-Type: $type`r`n" +
                "Content-Length: $($body.Length)`r`n" +
                "Cache-Control: no-store`r`n" +
                "Connection: close`r`n`r`n"

        $headBytes = $ascii.GetBytes($head)
        $stream.Write($headBytes, 0, $headBytes.Length)
        $stream.Write($body, 0, $body.Length)
        $stream.Flush()
    }
    catch {
        # a browser hanging up mid-request is normal; keep serving
    }
    finally {
        $client.Close()
    }
}
