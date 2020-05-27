package sample.model;

import org.junit.jupiter.api.Test;
import sample.controller.BD_CONTROLLER;

import java.sql.*;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;


class QuizTest {
    static String dburl = "jdbc:oracle:thin:@//193.136.11.147:1521/lustdb2";
    static String dbusername = "system";
    static String dbpassword = "DBpassword#1";

    @Test
    void getIdQuiz() {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query1 = "Select COUNT(*) FROM QUIZ ";

            ResultSet rs = st.executeQuery(query1);
            rs.next();
            int num = rs.getInt("COUNT(*)");
            String query2 = "Select PRISIONER_ID FROM PRIS_QUIZ WHERE APPROVAL=1 AND  ROWNUM <= 1 ";

            ResultSet r = st.executeQuery(query2);
            r.next();
            int n = r.getInt("PRISIONER_ID");


            int j = BD_CONTROLLER.getQuiz(n).getIdQuiz();
            System.out.println("ID quiz: " + j);


        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
        }

    }

    @Test
    void getQtdQuestoes() {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query2 = "Select PRISIONER_ID FROM PRIS_QUIZ WHERE APPROVAL=1 AND  ROWNUM <= 1 ";

            ResultSet r = st.executeQuery(query2);
            r.next();
            int n = r.getInt("PRISIONER_ID");
          int vfv= BD_CONTROLLER.getQuiz(n).getQuestoes().size();
        System.out.println(vfv);
    } catch(SQLException |
    ClassNotFoundException e)

    {
        System.out.println(e);
        System.out.println("Conexão sem sucesso");
    }

}

    @Test
    void getQuestoes() {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query2 = "Select PRISIONER_ID FROM PRIS_QUIZ WHERE APPROVAL=1 AND  ROWNUM <= 1 ";

            ResultSet r = st.executeQuery(query2);
            r.next();
            int n = r.getInt("PRISIONER_ID");
            ArrayList<Questoes> questions = new ArrayList<>();
            questions = BD_CONTROLLER.getQuiz(n).getQuestoes();
            int i=0;
            while(i<questions.size()) {
                System.out.println(questions.get(i).getQuestao());
                i++;
            }

        } catch (SQLException |
            ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
        }
    }}
