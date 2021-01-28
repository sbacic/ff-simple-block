## FF-Simple-Block

### A really simple Firefox extension for blocking time-wasting websites.

## Why use this over popular extensions such as LeechBlock, Stay Focused, Cold Turkey, etc...?

Because I wanted to know exactly what I'm installing and what has access to my sensitive data. This extension is
so stupidly simple that anyone can review the code by themselves and verify that it is safe.
Furthermore, because it needs to be manually signed and built, you don't have to worry about some future update introducing vulnerabilities or features you don't want.

## Build instructions.

1. Run `npm i -g web-ext`.
2. Run `web-ext sign --api-key=<APIKEY> --api-secret=<APISECRET> --ignore-files=.git/**/**,.gitignore,web-ext-artifacts/**`