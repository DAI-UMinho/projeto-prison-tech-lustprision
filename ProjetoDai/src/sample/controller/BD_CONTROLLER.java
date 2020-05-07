package sample.controller;
import sample.model.Prisioneiro;
import sample.model.Produto;
import sample.model.Trabalho;

import java.sql.*;
import java.util.*;

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

    public static ArrayList<WORK_TB> getWORKS() {

        ArrayList<WORK_TB> output = new ArrayList();

        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM WORK_JOB");

            while (rs.next()) {

                Trabalho x = new Trabalho(rs.getInt(1),rs.getString(2),rs.getInt(3),rs.getInt(4));


                WORK_TB y= new WORK_TB(x);
                output.add(y);
            }
            con.close();
            System.out.println("Trabalhos sairam da BD");
            return output;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");

            return null;
        }


    }

    //ADICIONAMOS ESTA FUNCAO PARA OS TESTES
    public static ArrayList<Prisioneiro> getPrisioners() {

        ArrayList<Prisioneiro> output = new ArrayList();

        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM PRISIONER");

            while (rs.next()) {

                Prisioneiro x = new Prisioneiro(rs.getInt(1), rs.getString(2), rs.getInt(4), rs.getDate(6),rs.getInt(7));



                output.add(x);
            }
            con.close();
            //System.out.println("Trabalhos sairam da BD");
            return output;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            //System.out.println("Conexão sem sucesso");

            return null;
        }


    }

   //teste 12 12
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
                    Prisioneiro user = new Prisioneiro(rs.getInt(1), rs.getString(2), rs.getInt(4), rs.getDate(6),rs.getInt(7));
                    System.out.println(rs.getInt(1)+ rs.getString(2)+ rs.getInt(4) + rs.getDate(6 ) + rs.getInt(7));
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

    public static int getProductStock(int id){
        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            String query = "SELECT ID,QUANTY_IN_STOCK FROM PRODUCT WHERE ID = '"+id+"'";
            ResultSet rs = st.executeQuery(query);
            con.close();
            return rs.getInt(2);

        } catch (SQLException | ClassNotFoundException e) {

            System.out.println(e);
            System.out.println("Stock indisponivel");
            return 0;

        }


    }

    public static boolean removeCredits(int id, int amount){
        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            String query = "UPDATE Prisioner SET BALANCE = BALANCE - " + Integer.toString(amount) +" WHERE ID = " + Integer.toString(id);
            ResultSet rs = st.executeQuery(query);
            con.close();
            return true;

        } catch (SQLException | ClassNotFoundException e) {

            System.out.println(e);
            System.out.println("Stock indisponivel");
            return false;

        }


    }

    //return void pendente
    public static void applyjob(int id, int idjob){
        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);

            Statement st = con.createStatement();
            String query = "INSERT INTO PRESS_WORK (ID,PRISIONER_ID, WORK_ID) VALUES ("+id+","+id+", "+idjob+")";
            ResultSet rs = st.executeQuery(query);
            System.out.println("CANDIDATURA");
            con.close();


        } catch (SQLException | ClassNotFoundException e) {

            System.out.println(e);
            System.out.println("Candidatura errada");


        }


    }






}
