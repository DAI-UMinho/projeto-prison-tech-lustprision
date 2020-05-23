package sample.view.controllerView;

import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import sample.Main;

import java.net.URL;
import java.util.ResourceBundle;

public class ProductLineController implements Initializable {
    public Label prodstock;
    public Label prodname;

    public static String name;
    public static int price;
    public static Button addpbtn;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        this.prodname.setText(name);
        this.prodstock.setText(Integer.toString(price));
    }

    public void handleAdicionar(){
        if(Main.sis.getProductFS(name).equals(null)){return;} //se algo correr mal aborta o metodo resumidamente
        Main.sis.sessionatual.addShopping(Main.sis.getProductFS(name));
        System.out.println(Main.sis.sessionatual.shoplist.toString());
    }

}
