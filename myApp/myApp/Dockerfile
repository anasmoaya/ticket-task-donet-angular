# Base image for ASP.NET Core runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# SDK image for build and publish steps
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["myApp.csproj", "./"]  # Adjust this to match your actual path
RUN dotnet restore "./myApp.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "myApp.csproj" -c Release -o /app/build

# Publish step
FROM build AS publish
RUN dotnet publish "myApp.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage: Copy and run the app
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "myApp.dll"]
