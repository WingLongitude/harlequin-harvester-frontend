name := "sib-indexer"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

lazy val Application = (project in file("controllers/Application")).enablePlugins(PlayJava)

lazy val User = (project in file("modules/User")).enablePlugins(PlayJava)

scalaVersion := "2.10.4"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache,
  "org.xerial" % "sqlite-jdbc" % "3.7.2",
  "org.scala-lang" % "scala-compiler" % "2.10.4"
)     

resolvers += "SQLite-JDBC Repository" at "https://oss.sonatype.org/content/repositories/snapshots" 
