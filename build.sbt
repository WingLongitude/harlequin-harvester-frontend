name := "sib-indexer"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache,
  "org.scala-lang" % "scala-compiler" % "2.10.4",
  "org.xerial" % "sqlite-jdbc" % "3.7.2"
)     

resolvers += "SQLite-JDBC Repository" at "https://oss.sonatype.org/content/repositories/snapshots" 

play.Project.playJavaSettings
