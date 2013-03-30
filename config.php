<?php

/* UTILITY FUNCTIONS */

  //Get the current page URL
  function curPageURL() {
    $pageURL = 'http';
    if ($_SERVER["HTTPS"] == "on") {
      $pageURL .= "s";
    }
    $pageURL .= "://";
    if ($_SERVER["SERVER_PORT"] != "80") {
      $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
    } 
    else {
      $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
    }
    return $pageURL;
  }

  function curPageURLNoProtocol() {
    $pageURL = '';
    if ($_SERVER["SERVER_PORT"] != "80") {
      $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
    } 
    else {
      $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
    }
    return $pageURL;
  }



/***************************************************************************************************************************************************************/

//Error logging. Must deactivate for client versions.
ini_set('display_errors',true);

  /* GLOBAL VARIABLES DECLARATION */

    /* Real Root Path */

      $temp_root = curPageURLNoProtocol();
      $temp_root = substr($temp_root,strpos($temp_root, "/"));
      $temp_root = substr($temp_root,0,strrpos($temp_root, "/"));
      $temp_root = substr($temp_root,0,strrpos($temp_root, "/"));
      $REAL_PATH = realpath($_SERVER["DOCUMENT_ROOT"]) . $temp_root;
      $REAL_INCLUDES_PATH = $REAL_PATH . "/includes";


    /* Site URLs */

      //The project root URL
      $PROJECT_ROOT = substr(curPageURL(),0,strrpos(curPageURL(), "/"));
      $PROJECT_ROOT = substr($PROJECT_ROOT,0,strrpos($PROJECT_ROOT, "/"));

      //The Pages folder URL
      $PAGES_URL = $PROJECT_ROOT . "/pages";

        //The Homepage
        $HOME_URL = $PAGES_URL . "/home.php";

      //The CSS folder URL
      $STYLES_URL = $PROJECT_ROOT . "/css";

      //The Includes folder URL
      $INCLUDES_URL = $PROJECT_ROOT . "/includes";

        //The Head Element
        $HEAD_URL = $INCLUDES_URL . "/head.php";

        //The Header
        $HEADER_URL = $INCLUDES_URL . "/header.php";

        //The Footer
        $FOOTER_URL = $INCLUDES_URL . "/footer.php";

      //The JS folder URL
      $SCRIPTS_URL = $PROJECT_ROOT . "/js";

      //The Images folder URL
      $IMAGES_URL = $PROJECT_ROOT . "/assets/images";

      //The Sprites folder URL
      $SPRITES_URL = $PROJECT_ROOT . "/assets/sprites";

?>