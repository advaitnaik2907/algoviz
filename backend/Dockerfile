# =========================================================
# STAGE 1: BUILD the Spring Boot jar using Maven + Java 21
# =========================================================
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml first so Docker can cache the downloaded libraries
COPY pom.xml .
RUN mvn -B dependency:go-offline

# Now copy the source code and build the jar
COPY src ./src
RUN mvn -B clean package -DskipTests

# =========================================================
# STAGE 2: RUN the jar with a small Java 21 runtime
# =========================================================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Run as a normal user instead of root (safer)
RUN useradd --system --create-home appuser
USER appuser

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]