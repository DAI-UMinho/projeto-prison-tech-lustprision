/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sample.view.controllerView;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.fxml.Initializable;
import static java.awt.SystemColor.window;
import java.io.IOException;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.image.ImageView;
import javafx.stage.Stage;
import sample.controller.BD_CONTROLLER;
import sample.controller.SYSTEM;
import java.util.*;
import sample.Main;
import sample.*;

public class LoginController implements Initializable {

    private BD_CONTROLLER bd_controller;

    public PasswordField pwd1;

    public Button btn1;
    public Button btn4;
    public Button btn3;
    public Button btn2;
    public Button btn8;
    public Button btn6;
    public Button btn5;
    public Button btn9;
    public Button btn7;
    public Button btndelete;
    public Button btn0;
    public Label badloginlbl;



    @FXML
    private void onClick(ActionEvent event) throws IOException {

            if(pwd1.getText().equals("")){
                badloginlbl.setVisible(true);
                return;
            }

            try {

                if (Main.sis.LoginTS(1202, Integer.valueOf(pwd1.getText()))) {

                    Main.sis.loadWorksTS();
                    Main.sis.loadProductsTS();
                    Main.sis.loadFilterJobs();




                    Parent home_page_parent = FXMLLoader.load(getClass().getResource("/sample/view/shop.fxml"));
                    Scene home_page_scene = new Scene(home_page_parent);
                    Stage app_stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
                    app_stage.setScene(home_page_scene);
                    app_stage.show();

                } else{badloginlbl.setVisible(true);

                };
            }catch (Exception e ){};



    }

    @FXML
    private void onClickbtn1(ActionEvent event) throws IOException {
        if(pwd1.getText().length()==4){}else{
        String txt = pwd1.getText();
        String newtxt = txt +"1";
        pwd1.setText(newtxt);}

    }
    @FXML
    private void onClickbtn2(ActionEvent event) throws IOException {
        if(pwd1.getText().length()==4){}else{
        String txt = pwd1.getText();
        String newtxt = txt +"2";
        pwd1.setText(newtxt);}

    }
    @FXML
    private void onClickbtn3(ActionEvent event) throws IOException {
        if(pwd1.getText().length()==4){}else {
            String txt = pwd1.getText();
            String newtxt = txt + "3";
            pwd1.setText(newtxt);
        }
    }
    @FXML
    private void onClickbtn4(ActionEvent event) throws IOException {
        if(pwd1.getText().length()==4){}else{
        String txt = pwd1.getText();
        String newtxt = txt +"4";
        pwd1.setText(newtxt);
        }
    }
    @FXML
    private void onClickbtn5(ActionEvent event) throws IOException {
        if(pwd1.getText().length()==4){}else{
        String txt = pwd1.getText();
        String newtxt = txt +"5";
        pwd1.setText(newtxt);
        }
    }
    @FXML
    private void onClickbtn6(ActionEvent event) throws IOException {
        if(pwd1.getText().length()==4){}else{
        String txt = pwd1.getText();
        String newtxt = txt +"6";
        pwd1.setText(newtxt);
        }
    }
    @FXML
    private void onClickbtn7(ActionEvent event) throws IOException {
        if(pwd1.getText().length()==4){}else{
        String txt = pwd1.getText();
        String newtxt = txt +"7";
        pwd1.setText(newtxt);
        }
    }
    @FXML
    private void onClickbtn8(ActionEvent event) throws IOException {
        if(pwd1.getText().length()==4){}else{
        String txt = pwd1.getText();
        String newtxt = txt +"8";
        pwd1.setText(newtxt);
        }
    }
    @FXML
    private void onClickbtn9(ActionEvent event) throws IOException {
        if(pwd1.getText().length()==4){}else{
        String txt = pwd1.getText();
        String newtxt = txt +"9";
        pwd1.setText(newtxt);
        }
    }
    @FXML
    private void onClickbtn0(ActionEvent event) throws IOException {
        if(pwd1.getText().length()==4){}else{
        String txt = pwd1.getText();
        String newtxt = txt +"0";
        pwd1.setText(newtxt);
        }
    }
    @FXML
    private void onClickbtndelete(ActionEvent event) throws IOException {
        pwd1.setText("");

    }



    @Override
    public void initialize(URL url, ResourceBundle rb) {
        badloginlbl.setVisible(false);

    }


}
