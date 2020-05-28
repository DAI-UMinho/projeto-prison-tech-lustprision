package sample.model;

import org.junit.jupiter.api.Test;
import sample.Main;
import sample.controller.BD_CONTROLLER;
import sample.controller.WORK_TB;

import java.sql.*;


import static org.junit.jupiter.api.Assertions.*;

class TrabalhoTest {

    static String dburl = "jdbc:oracle:thin:@//193.136.11.147:1521/lustdb2";
    static String dbusername = "system";
    static String dbpassword = "DBpassword#1";

    @Test
    void getVagasTrabalhos() {

        int i = 0;
        int soma = 0;

        while (i < BD_CONTROLLER.getWORKS().size()) {
            System.out.println("nº vagas do trabalho " + BD_CONTROLLER.getWORKS().get(i).type.getNome() + " é " + BD_CONTROLLER.getWORKS().get(i).type.getVagas()); //numero de vagas de determinado trabalho
            int x = BD_CONTROLLER.getWORKS().get(i).type.getVagas();
            soma += x; //soma todas as vagas
            i++;
        }
        System.out.println("Soma de todas as vagas disponiveis: " + soma);
        //assertEquals(5, x); //verifica se o valor espera de vagas coincide com o armazenado
    }

    @Test
    void getPrecoHora() {
        int i = 0;
        int soma = 0;

        while (i < BD_CONTROLLER.getWORKS().size()) {
            System.out.println("O valor do preço-hora do trabalho " + BD_CONTROLLER.getWORKS().get(i).type.getNome() + " é " + BD_CONTROLLER.getWORKS().get(i).type.getPrecoHora()); //valor do preco hora de determinado trabalho
            int x = BD_CONTROLLER.getWORKS().get(i).type.getPrecoHora();
            soma += x; //soma todos os valores de precoHora
            i++;
        }
        System.out.println("Soma de todos os preços-hora disponiveis: " + soma);
    }

    @Test
    void getNome() {
        int i = 0;

        while (i < BD_CONTROLLER.getWORKS().size()) {
            System.out.println("O nome do trabalho é: " + BD_CONTROLLER.getWORKS().get(i).type.getNome()); //Nome dos trabalhos
            i++;
        }
    }

    @Test
    void getIdTrabalho() {
        int i = 0;
        int soma = 0;

        while (i < BD_CONTROLLER.getWORKS().size()) {
            System.out.println("O id do trabalho " + BD_CONTROLLER.getWORKS().get(i).type.getNome() + " é " + BD_CONTROLLER.getWORKS().get(i).type.getIdTrabalho()); //id de cada trabalho
            i++;
        }
        System.out.println("Nº de trabalhos disponiveis: " + i); //total de trabalhos disponiveis
    }

    @Test
    void inscricaoTrabalho() {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query1 = "Select ID FROM PRISIONER WHERE ROWNUM <= 1";
            ResultSet rs = st.executeQuery(query1);
            rs.next();
            int id = rs.getInt("ID");
            System.out.println(id);
            String query2 = "Select ID, NUM_REMAINING_ENTRIES FROM WORK_JOB WHERE STATE_ID = 1 AND ROWNUM <= 1";
            ResultSet result = st.executeQuery(query2);
            result.next();
            int vagas = result.getInt("NUM_REMAINING_ENTRIES");
            System.out.println("quantidade de vagas inicialmente:" + vagas);
            int idJob = result.getInt("ID");
            System.out.println(idJob);
            BD_CONTROLLER.applyjob(id,idJob);
            String query3 = "Select NUM_REMAINING_ENTRIES FROM WORK_JOB WHERE ID = " + idJob;
            ResultSet result2 = st.executeQuery(query3);
            result2.next();
            int vagas2 = result2.getInt("NUM_REMAINING_ENTRIES");
            System.out.println("quantidade de vagas inicialmente:"+vagas2);
            con.close();
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
        }
    }
}
