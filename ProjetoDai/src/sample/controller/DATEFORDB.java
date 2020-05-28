package sample.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DATEFORDB {

    Date now = new Date();

    public DATEFORDB(){}

    public String currentdateforsql() {
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        String date = format.format(now);
        String output = "'" + date + "'";
        return output;
    }
}
