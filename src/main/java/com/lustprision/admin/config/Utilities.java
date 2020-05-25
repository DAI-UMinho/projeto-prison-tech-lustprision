package com.lustprision.admin.config;

import java.text.DateFormat;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class Utilities {

    public static final int MONTH_FIRST_DAY = 1;
    public static final int MONTH_LAST_DAY_IDENTIFIER = 100;
    public Utilities(){}

    public static String getDateFormatted(int index, int chosenDay){
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        Calendar month = Calendar.getInstance();
        month.add(Calendar.MONTH, - index);
        if(chosenDay == MONTH_LAST_DAY_IDENTIFIER){
            month.set(Calendar.DAY_OF_MONTH, month.getActualMaximum(Calendar.DAY_OF_MONTH));
        }else {
            month.set(Calendar.DAY_OF_MONTH, chosenDay);
        }
        return df.format(month.getTime());
    }

    public static String convertMonth(int index){
        Calendar month = Calendar.getInstance();
        month.add(Calendar.MONTH, - index);
        String date = new DateFormatSymbols().getMonths()[month.get(Calendar.MONTH)];
        return date.substring(0, 1).toUpperCase() + date.substring(1);
    }
}
