$ErrorActionPreference = 'Stop'

function Save-Utf8([string]$Path, [string]$Content) {
  [System.IO.File]::WriteAllText($Path, $Content, (New-Object System.Text.UTF8Encoding($false)))
}

$targets = @(
  @{
    Path = 'C:\Desenvolvimento\femictec\src\api\femictec\content-types\femictec\schema.json'
    Replace = @{
      '"displayName": "PÃ¡gina - FEMICTEC"' = '"displayName": "Página - FEMICTEC"'
      '"displayName": "Pagina - FEMICTEC"' = '"displayName": "Página - FEMICTEC"'
    }
  },
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
      '- `Navbar`' = '- `Global - Navbar`'
      '- `Footer`' = '- `Global - Footer`'
      '- `Femictec`' = '- `Página - FEMICTEC`'
      'single types`: paginas unicas, como `Feira`, `Footer`, `Home` e `Contato`;' = 'single types`: paginas unicas, como `Feira`, `Home`, `Contato` e blocos globais como `Navbar` e `Footer`;'
      '- `Femictec` tem `menuInterno`, `apresentacao`, `quemRealiza` e `historico`;' = '- `Página - FEMICTEC` tem `menuInterno`, `apresentacao`, `quemRealiza` e `historico`;'
    }
  }
)

foreach ($target in $targets) {
  $content = Get-Content -Raw -LiteralPath $target.Path -Encoding UTF8
  $updated = $content
  foreach ($pair in $target.Replace.GetEnumerator()) {
    $updated = $updated.Replace($pair.Key, $pair.Value)
  }
  if ($updated -eq $content) {
    throw "Nao houve alteracao em $($target.Path)"
  }
  Save-Utf8 -Path $target.Path -Content $updated
}
