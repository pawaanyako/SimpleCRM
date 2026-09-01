FROM node:22-alpine AS client-build
WORKDIR /client
COPY src/client/package.json .
COPY src/client/package-lock.json .
RUN npm ci
COPY src/client .
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS api-build
WORKDIR /api
COPY src/api/Api.csproj .
RUN dotnet restore
COPY src/api .
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=api-build /app/publish .
COPY --from=client-build /client/dist ./wwwroot
EXPOSE 8080
ENTRYPOINT ["dotnet", "Api.dll"]