package sample.controller;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ReadBeaconID {
    String id;

    public ReadBeaconID(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public static int ReadFile() throws IOException {
        int iduuid = 0;
        BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\shenr\\Desktop\\uuid.txt"));
    try{
        while(br.ready()){
            String linha = br.readLine();
            iduuid = Integer.parseInt(linha);
            //System.out.println(linha);
        }
        br.close();
    }catch(
    IOException ioe){
        ioe.printStackTrace();
        iduuid = 0;
    }
        return iduuid;
    }
}
