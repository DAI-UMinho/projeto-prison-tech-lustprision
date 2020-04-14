import java.util.ArrayList;

public class SYSTEM {
    ArrayList<PRODUCT_TB> products = new ArrayList();
    SESSION atual;

    public void loadProductsTS() {
        if (BD_CONTROLLER.getPRODUCTS() == null) {
        } else this.products = BD_CONTROLLER.getPRODUCTS();
    }

    public boolean LoginTS(int ID, int PIN){
        if(PIN == BD_CONTROLLER.getPrisionerPIN(ID)){
            return true;
        }else return false;

    }


}
