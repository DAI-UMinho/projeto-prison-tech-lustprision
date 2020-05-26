package sample.view.controllerView;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;

import sample.Main;

import sample.controller.BD_CONTROLLER;
import sample.model.Produto;
import sample.view.controllerView.ShopController.*;




import java.net.URL;
import java.util.ResourceBundle;

public class ProductLineController extends ShopController implements Initializable {

    public Label prodstock;
    public Label prodname;

    public static String name;
    public static int price;
    public static int id;

    public int id1;


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        id1 = id;
        this.prodname.setText(name);
        this.prodstock.setText(Integer.toString(price));
    }

    
    public void handleBtnAdicionar(ActionEvent actionEvent) {

        super.BtnAdicionar(id1);

    }

    public void handleAdicionar(ActionEvent actionEvent) {

    }
}
