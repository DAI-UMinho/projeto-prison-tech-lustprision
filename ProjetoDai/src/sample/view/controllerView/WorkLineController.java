package sample.view.controllerView;
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
import javafx.scene.control.Label;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;



public class WorkLineController implements Initializable{

    @FXML public Pane workpane;
    @FXML public Label worknamelbl;
    @FXML public Label workvagaslbl;
    @FXML public Label workremunlbl;

    public static String name;
    public static int vagas;
    public static int remun;



    @Override
    public void initialize(URL url, ResourceBundle rb) {
        worknamelbl.setText(name);
        workvagaslbl.setText(Integer.toString(vagas));
        workremunlbl.setText(Integer.toString(remun));
    }





}
