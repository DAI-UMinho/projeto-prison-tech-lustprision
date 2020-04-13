package Front;

import Back.*;
import javafx.application.Application;
import javafx.stage.Stage;

import javax.swing.*;

public class Main {
    private static JFrame f = new JFrame();
    private static LustPrison dados = new LustPrison();

    public static JFrame getFrame(){
        return f;
    }

    public static void setFrame(JFrame frame){
        f = frame;
    }
    public static LustPrison getDados(){
        return dados;
    }

    public static void main(String args[]) {
        JPanel i = new Login(dados);
    }
}
