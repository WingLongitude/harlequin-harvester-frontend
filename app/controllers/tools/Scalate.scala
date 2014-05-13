package controllers.tools

import play.api._
import play.api.http.{Writeable, ContentTypeOf, ContentTypes}
import play.api.mvc.{AnyContent, Request, Codec}
import play.api.Play.current
import org.fusesource.scalate.layout.DefaultLayoutStrategy
import org.fusesource.scalate.TemplateEngine
import org.fusesource.scalate.util.FileResourceLoader
import scala.Option.option2Iterable
import play.api.mvc.Content
import scala.collection.JavaConversions._

object Scalate {
	import org.fusesource.scalate._
	import org.fusesource.scalate.util._
	
	var format = Play.configuration.getString("scalate.format") match {
		case Some(configuredFormat) => configuredFormat
		case _ => "scaml"
	}
	
	lazy val scalateEngine = {
    val engine = new TemplateEngine
    engine.resourceLoader = new FileResourceLoader(Some(Play.getFile("/app/views")))
    engine.layoutStrategy = new DefaultLayoutStrategy(engine, Play.getFile("/app/views/layouts/default." + format).getAbsolutePath)
    engine.classpath = Play.getFile("/tmp/classes").getAbsolutePath
    engine.workingDirectory = Play.getFile("tmp")
    engine.combinedClassPath = true
    engine.classLoader = Play.classloader
    engine
  }
	
	def apply(template: String) = Template(template)
 
	case class Template(name: String) {
		def render(args: (Symbol, Any)*) = {
			contentTypeOf_Content;
			Content{
				scalateEngine.layout(name, args.map {
					case (k, v) => k.name -> v
				} toMap)
			}
		}
	}
 
  case class Content(val cont: String)
 
  implicit def writeableOf_Content(implicit codec: Codec): Writeable[Content] = {
    Writeable[Content]((scalate: Content) => codec.encode(scalate.cont))
  }
 
  implicit def contentTypeOf_Content(implicit codec: Codec): ContentTypeOf[Content] = {
    ContentTypeOf[Content](Some(ContentTypes.HTML))
  }
}