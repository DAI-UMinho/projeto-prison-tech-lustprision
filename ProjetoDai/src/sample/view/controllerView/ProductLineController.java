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

public class ProductLineController implements Initializable {
    public Label prodstock;
    public Label prodname;

    public static String name;
    public static int price;


    public static Button addpbtn;
    //public Button addpbtn;

    ShopController shop = new ShopController();

    public static int id;

    public int id1;


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        id1 = id;
        this.prodname.setText(name);
        this.prodstock.setText(Integer.toString(price));
    }


    /*public void handleAdicionar(){
        if(Main.sis.getProductFS(name).equals(null)){return;} //se algo correr mal aborta o metodo resumidamente
        Main.sis.sessionatual.addShopping(Main.sis.getProductFS(name));
        System.out.println(Main.sis.sessionatual.shoplist.toString());
    }*/


    public void handleBtnAdicionar(ActionEvent actionEvent) {
        //ShopController.handleBtnAdicionar(id1); // metodo a static
        shop.BtnAdicionar(id1);
        //shop.totaltxt.setText("fds");
    }
}
