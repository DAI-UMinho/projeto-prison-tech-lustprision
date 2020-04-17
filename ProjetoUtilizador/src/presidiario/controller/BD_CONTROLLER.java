package UTILITARY;

import MAIN_CLASS.Prisioneiro;
import MAIN_CLASS.Produto;

import java.sql.*;
import java.util.ArrayList;


public class BD_CONTROLLER {

    static String dburl = "jdbc:oracle:thin:@//193.136.11.147:1521/lustdb2";
    static String dbusername = "system";
    static String dbpassword = "DBpassword#1";
    



    public static ArrayList<PRODUCT_TB> getPRODUCTS() {

        ArrayList<PRODUCT_TB> output = new ArrayList();

        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM Product ");

            while (rs.next()) {
                //coisas que faltem ir buscar à bd adicionar ao construtor de produtos e ir buscar ao ResultSet
                Produto x = new Produto(rs.getInt(1), rs.getString(3), rs.getString(6), rs.getInt(4), rs.getInt(7));

                //só para ver o que sai da bd no terminal depois apagar
                System.out.println(rs.getInt(1) + "|||" + rs.getString(3) + "|||" + rs.getString(6) + "|||" + rs.getInt(4) + "|||" + rs.getInt(7));
                // -----
                PRODUCT_TB y = new PRODUCT_TB(x);
                output.add(y);
            }
            con.close();

            return output;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");

            return null;
        }


    }


    public static int getPrisionerPIN(int ID) {

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT ID,CODIGO_CARTAO FROM Prisioner ");

            while (rs.next()) {
                if (rs.getInt(1) == ID) {
                    return rs.getInt(2);
                }
            }
            con.close();


        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");


        }
        return 0;
    }

    public static Prisioneiro loadUser(int ID) {
        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM Prisioner ");

            while (rs.next()) {
        if (rs.getInt(1) == ID) {
            Prisioneiro user = new Prisioneiro(rs.getInt(1), rs.getString(2), rs.getInt(7));
            System.out.println(rs.getInt(1)+ rs.getString(2)+ rs.getInt(7));
            return user;
        }
    }
            con.close();


} catch (SQLException | ClassNotFoundException e) {
        System.out.println(e);
        System.out.println("Conexão sem sucesso");


        }
        return null;
        }


    public static boolean removeProduct(int id, int qnty){
        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            String query = "UPDATE Product SET QUANTY_IN_STOCK = QUANTY_IN_STOCK - " + Integer.toString(qnty) +" WHERE ID = " + Integer.toString(id);
            ResultSet rs = st.executeQuery(query);
            con.close();
            return true;

        } catch (SQLException | ClassNotFoundException e) {

            System.out.println(e);
            System.out.println("Stock indisponivel");
            return false;

        }


    }




}




