package sample.view.controllerView;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
<<<<<<< HEAD
import sample.Main;
=======
import sample.controller.BD_CONTROLLER;
import sample.model.Produto;
>>>>>>> dd6a6a1c85f8e0d84cc775a3d3a6d53e85460c7b

import java.net.URL;
import java.util.ResourceBundle;

public class ProductLineController implements Initializable {
    public Label prodstock;
    public Label prodname;

    public static String name;
    public static int price;
<<<<<<< HEAD
    public static Button addpbtn;
=======
    public static int id;

    public int id1;
>>>>>>> dd6a6a1c85f8e0d84cc775a3d3a6d53e85460c7b

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        id1 = id;
        this.prodname.setText(name);
        this.prodstock.setText(Integer.toString(price));
    }

<<<<<<< HEAD
    public void handleAdicionar(){
        if(Main.sis.getProductFS(name).equals(null)){return;} //se algo correr mal aborta o metodo resumidamente
        Main.sis.sessionatual.addShopping(Main.sis.getProductFS(name));
        System.out.println(Main.sis.sessionatual.shoplist.toString());
    }

=======
    public void handleBtnAdicionar(ActionEvent actionEvent) {
        ShopController.handleBtnAdicionar(id1);
    }


>>>>>>> dd6a6a1c85f8e0d84cc775a3d3a6d53e85460c7b
}
