package sample.view.controllerView;
import java.awt.*;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.Pane;
import javafx.stage.Popup;
import javafx.stage.Stage;
import sample.Main;

import javax.swing.*;


public class WorkLineController implements Initializable{

    @FXML public Pane workpane;
    @FXML public Label worknamelbl;
    @FXML public Label workvagaslbl;
    @FXML public Label workremunlbl;

    public static String name;
    public static int vagas;
    public static int remun;
    public static int id;

    public Button candidatarbtn;

    public int id1;

    @Override
    public void initialize(URL url, ResourceBundle rb) {
        id1 = id;
        worknamelbl.setText(name);
        workvagaslbl.setText(Integer.toString(vagas));
        workremunlbl.setText(Integer.toString(remun));
    }


    public void handlecandidata(ActionEvent actionEvent) {
        try{
        //System.out.print("candidatar");
        //System.out.print(id1);
        Main.sis.sessionatual.applyJOB(Main.sis.sessionatual.nowusing.getID(), id1);


        } catch (Exception e){
            JOptionPane.showMessageDialog(null, "Erro na tentativa de candidatura.");
        }

    }
}
