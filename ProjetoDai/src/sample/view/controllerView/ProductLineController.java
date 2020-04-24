package sample.view.controllerView;

import javafx.fxml.Initializable;
import javafx.scene.control.Label;

import java.net.URL;
import java.util.ResourceBundle;

public class ProductLineController implements Initializable {
    public Label prodstock;
    public Label prodname;

    public static String name;
    public static int price;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        this.prodname.setText(name);
        this.prodstock.setText(Integer.toString(price));
    }
}
