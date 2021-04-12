name: 京东极速版红包

on:
    workflow_dispatch:
    schedule:
        - cron: "30 5 * * 4,5"

jobs:
    build:
        runs-on: ubuntu-latest
        if: github.event.repository.owner.id == github.event.sender.id
        steps:
            - uses: actions/checkout@v1
            - uses: actions/checkout@v2
              with:
                fetch-depth: 0
                repository: sprindjack/jd_scripts
                token: ${{ secrets.PAT }}
                path: jd_scripts
            - name: Use Node.js 10.x
              uses: actions/setup-node@v1
              with:
                  node-version: 10.x
            - name: npm install
              run: |
                  npm install
            - name: "运行"
              run: |
                  node jd_scripts/jd_speed_redpocke.js
              env:
                  JD_COOKIE: ${{ github.event.client_payload.JD_COOKIE || secrets.JD_COOKIE }}
                  JD_DEBUG: ${{ github.event.client_payload.JD_DEBUG || secrets.JD_DEBUG }}
                  JD_USER_AGENT: ${{ github.event.client_payload.JD_USER_AGENT || secrets.JD_USER_AGENT }}
                  TG_BOT_TOKEN: ${{ github.event.client_payload.TG_BOT_TOKEN || secrets.TG_BOT_TOKEN }}
                  TG_USER_ID: ${{ github.event.client_payload.TG_USER_ID || secrets.TG_USER_ID }}
                
