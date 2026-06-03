$ErrorActionPreference = 'Stop'

function Save-Utf8([string]$Path, [string]$Content) {
  [System.IO.File]::WriteAllText($Path, $Content, (New-Object System.Text.UTF8Encoding($false)))
}

$pagina = [string]::Concat('P', [char]0x00E1, 'gina - FEMICTEC')

$docsPath = 'C:\Desenvolvimento\femictec\docs\USABILIDADE-STRAPI.md'
$docsContent = Get-Content -Raw -LiteralPath $docsPath -Encoding UTF8
$docsUpdated = $docsContent
$docsUpdated = [regex]::Replace($docsUpdated, '(?m)^- `single types`: paginas unicas, como `Feira`, `Footer`, `Home` e `Contato`;$', '- `single types`: paginas unicas, como `Feira`, `Home` e `Contato`, e blocos globais como `Navbar` e `Footer`;')
$docsUpdated = [regex]::Replace($docsUpdated, '(?m)^- .*FEMICTEC`$', '- ' + $pagina)
$docsUpdated = [regex]::Replace($docsUpdated, '(?m)^- `Femictec` tem `menuInterno`, `apresentacao`, `quemRealiza` e `historico`;$', '- ' + $pagina + ' tem `menuInterno`, `apresentacao`, `quemRealiza` e `historico`;')
$docsUpdated = [regex]::Replace($docsUpdated, '(?m)^- `Footer`$', '- `Global - Footer`')
$docsUpdated = [regex]::Replace($docsUpdated, '(?m)^- `Navbar`$', '- `Global - Navbar`')
$docsUpdated = [regex]::Replace($docsUpdated, '(?m)^single types`: paginas unicas, como `Feira`, `Footer`, `Home` e `Contato`;$', 'single types`: paginas unicas, como `Feira`, `Home` e `Contato`, e blocos globais como `Navbar` e `Footer`;')

if ($docsUpdated -eq $docsContent) {
  throw "Nao houve alteracao em $docsPath"
}

Save-Utf8 -Path $docsPath -Content $docsUpdated

$typesPath = 'C:\Desenvolvimento\femictec\types\generated\contentTypes.d.ts'
try {
  $typesContent = Get-Content -Raw -LiteralPath $typesPath -Encoding UTF8
  $typesUpdated = $typesContent.Replace("displayName: 'Femictec';", "displayName: '$pagina';")
  if ($typesUpdated -ne $typesContent) {
    Save-Utf8 -Path $typesPath -Content $typesUpdated
  }
} catch {
  Write-Warning "Nao foi possivel atualizar o arquivo gerado de tipos agora: $($_.Exception.Message)"
}
