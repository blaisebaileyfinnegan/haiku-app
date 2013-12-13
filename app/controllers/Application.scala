package controllers

import scala.collection.JavaConversions._

import play.api._
import play.api.mvc._
import play.api.libs.json

import edu.uci.arcastro.Global
import edu.uci.arcastro._
import play.libs.Json
import java.util

object Application extends Controller {
  edu.uci.arcastro.Global.Initialize()

  def naive = Action {
    Ok(Json.toJson(Global.naive).toString).withHeaders(PRAGMA -> "no-cache")

  }

  def markov = Action {
    Ok(Json.toJson(Global.markov).toString).withHeaders(PRAGMA -> "no-cache")
  }

  def everything(str: String) = Action {
    try {
      val tokens = seqAsJavaList(str.split(" "))
      val haiku = Global.everything(tokens)
      Ok(Json.toJson(haiku).toString).withHeaders(PRAGMA -> "no-cache")
    } catch {
      case _ => {
        println("Error on " + str)
        NotFound("")
      }
    }
  }

  def everythingV2(str: String) = Action {
    try {
      val tokens = seqAsJavaList(str.split(" "))
      val haiku = Global.everythingV2(tokens)
      Ok(Json.toJson(haiku).toString).withHeaders(PRAGMA -> "no-cache")
    } catch {
      case _ => {
        println("Error on " + str)
        NotFound("")
      }
    }
  }
}