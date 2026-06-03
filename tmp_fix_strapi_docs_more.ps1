$ErrorActionPreference = 'Stop'

function Save-Utf8([string]$Path, [string]$Content) {
  [System.IO.File]::WriteAllText($Path, $Content, (New-Object System.Text.UTF8Encoding($false)))
}

$docs = @(
  @{
    Path = 'C:\Desenvolvimento\femictec\README.md'
    Replace = @{
      '- `Footer` - single type - endpoint `/api/footer`' = '- `Global - Footer` - single type - endpoint `/api/footer`'
      '- `Navbar` - single type - endpoint `/api/navbar`' = '- `Global - Navbar` - single type - endpoint `/api/navbar`'
      '- `Femictec` - single type - endpoint `/api/femictec`' = '- `Página - FEMICTEC` - single type - endpoint `/api/femictec`'
    }
  },
  @{
    Path = 'C:\Desenvolvimento\femictec\docs\USABILIDADE-STRAPI.md'
    Replace = @{
      '- `Footer`' = '- `Global - Footer`'
      '- `Navbar`' = '- `Global - Navbar`'
      '- `Femictec`' = '- `Página - FEMICTEC`'
      'single types`: paginas unicas, como `Feira`, `Footer`, `Home` e `Contato`;' = 'single types`: paginas unicas, como `Feira`, `Home` e `Contato`, e blocos globais como `Navbar` e `Footer`;'
      '`Femictec` tem `menuInterno`, `apresentacao`, `quemRealiza` e `historico`;' = '`Página - FEMICTEC` tem `menuInterno`, `apresentacao`, `quemRealiza` e `historico`;'
    }
  }
)

foreach ($doc in $docs) {
  $content = Get-Content -Raw -LiteralPath $doc.Path -Encoding UTF8
  $updated = $content
  foreach ($pair in $doc.Replace.GetEnumerator()) {
    $updated = $updated.Replace($pair.Key, $pair.Value)
  }
  if ($updated -eq $content) {
    throw "Nao houve alteracao em $($doc.Path)"
  }
  Save-Utf8 -Path $doc.Path -Content $updated
}
