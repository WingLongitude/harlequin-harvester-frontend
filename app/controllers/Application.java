package controllers;

import play.*;
import play.mvc.*;
import play.data.*;
import static play.data.Form.*;

import java.util.List;
import java.util.ArrayList;
import models.*;
import views.html.*;

import controllers.tools.Scalate;
import scala.collection.Seq;
import scala.Tuple2;
import scala.Symbol;
import controllers.DataSets;

public class Application extends Controller {
	
	public static class Login {
	    
	    public String email;
	    public String password;
	    
	    public String validate() {
	        if(User.authenticate(email, password) == null) {
	            return "Invalid user or password";
	        }
	        return null;
	    }
	    
	}
	
	@Security.Authenticated(Secured.class)
	public static Result index() {
		
		List<Tuple2<Symbol,Object>> list = new ArrayList<Tuple2<Symbol,Object>>();
		Tuple2<Symbol, Object> userEmail  = new Tuple2<Symbol, Object>(new Symbol("userEmail"), request().username());
		
		list.add(userEmail);

		return ok(Scalate.apply("index.scaml").render((Seq<Tuple2<Symbol, Object>>) scala.collection.JavaConversions.asScalaBuffer(list)).cont()).as("HTML");
	}
	
		@Security.Authenticated(Secured.class)
	public static Result list() {
		
		List<Tuple2<Symbol,Object>> list = new ArrayList<Tuple2<Symbol,Object>>();
		Tuple2<Symbol, Object> userEmail  = new Tuple2<Symbol, Object>(new Symbol("userEmail"), request().username());
		
		list.add(userEmail);

		return ok(Scalate.apply("list.scaml").render((Seq<Tuple2<Symbol, Object>>) scala.collection.JavaConversions.asScalaBuffer(list)).cont()).as("HTML");
	}
	
	@Security.Authenticated(Secured.class)
	public static Result stats() {
		
		List<Tuple2<Symbol,Object>> list = new ArrayList<Tuple2<Symbol,Object>>();
		Tuple2<Symbol, Object> userEmail  = new Tuple2<Symbol, Object>(new Symbol("userEmail"), request().username());
		
		list.add(userEmail);

		return ok(Scalate.apply("stats.scaml").render((Seq<Tuple2<Symbol, Object>>) scala.collection.JavaConversions.asScalaBuffer(list)).cont()).as("HTML");
	}
	
	
	public static Result login() {
		List<Tuple2<Symbol,Object>> list = new ArrayList<Tuple2<Symbol,Object>>();
		Tuple2<Symbol, Object> form = new Tuple2<Symbol, Object>(new Symbol("loginForm"), form(Login.class));
		list.add(form);
		return ok(Scalate.apply("login.scaml").render((Seq<Tuple2<Symbol, Object>>) scala.collection.JavaConversions.asScalaBuffer(list)).cont()).as("HTML");
	}
    

	public static Result authenticate() {
	    Form<Login> loginForm = form(Login.class).bindFromRequest();
	    
	    if(loginForm.hasErrors()) {
		    List<Tuple2<Symbol,Object>> list = new ArrayList<Tuple2<Symbol,Object>>();
			Tuple2<Symbol, Object> loginForm_1 = new Tuple2<Symbol, Object>(new Symbol("loginForm"), loginForm);
			list.add(loginForm_1);
			
	        return badRequest(Scalate.apply("login.scaml").render((Seq<Tuple2<Symbol, Object>>) scala.collection.JavaConversions.asScalaBuffer(list)).cont()).as("HTML");
	    } else {
	    	session().clear();
	        session("email", loginForm.get().email);
			return redirect(controllers.routes.Application.index());
	    }
	}

	public static Result logout() {
	    session().clear();
	    flash("success", "You've been logged out");
	    return redirect(controllers.routes.Application.login());
	}
	
}
