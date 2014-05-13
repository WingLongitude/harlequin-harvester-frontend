package controllers;

import java.util.ArrayList;
import java.util.List;
import models.*;

import controllers.tools.Scalate;
import scala.Tuple2;
import scala.Symbol;
import scala.collection.Seq;
import play.mvc.*;

/**
 * Manage projects related operations.
 */
@Security.Authenticated(Secured.class)
public class DataSets extends Controller {

	public static Result index() {
		System.out.println("Index dataset");
		List<Tuple2<Symbol,Object>> list = new ArrayList<Tuple2<Symbol,Object>>();
		Tuple2<Symbol, Object> homeTitle = new Tuple2<Symbol, Object>(new Symbol("homeTitle"), new String("DataSet List"));
		list.add(homeTitle);

		return ok(Scalate.apply("list.scaml").render((Seq<Tuple2<Symbol, Object>>) scala.collection.JavaConversions.asScalaBuffer(list)).cont()).as("HTML");
	}

}