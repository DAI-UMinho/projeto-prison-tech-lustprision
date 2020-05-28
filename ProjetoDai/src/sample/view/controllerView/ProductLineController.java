package sample.view.controllerView;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;

import javafx.stage.Stage;
import sample.Main;

import sample.controller.BD_CONTROLLER;
import sample.model.Produto;
import sample.view.controllerView.ShopController.*;


import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class ProductLineController implements Initializable {



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



    public void handleAdicionar(ActionEvent actionEvent) throws IOException {



        Main.sis.sessionatual.addShopping(Main.sis.getProductFS(id1));
        System.out.println(Main.sis.getProductFS(id1).type.getNome());


        ShopController.isshopping=true;

        Parent loja_parent = FXMLLoader.load(getClass().getResource("/sample/view/shop.fxml"));
        Scene loja_scene = new Scene(loja_parent);
        Stage loja_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        loja_stage.setScene(loja_scene);
        loja_stage.show();



    }



    }


