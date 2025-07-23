@echo off
setlocal

echo Updating Elasticsearch mapping...
pushd SummariesServer
curl -X DELETE http://localhost:9200/summaries
echo 
curl -X PUT "http://localhost:9200/summaries" -H "Content-Type: application/json" --data-binary @elasticsearch/mapping.json
popd


echo Starting Node.js server...
pushd SummariesServer
start cmd /k "npm i && npm run dev && cd ../"
popd

echo Starting .NET server...
pushd ProductsServer
start cmd /k "dotnet build && dotnet run && cd ../"
popd

echo Starting React client...
pushd ShoppingClientServer
start cmd /k "npm i && npm run dev"
popd

echo Waiting for 10 seconds to let the server initialize...
timeout /t 10 /nobreak >nul


echo Opening browser...
start http://localhost:5173


endlocal