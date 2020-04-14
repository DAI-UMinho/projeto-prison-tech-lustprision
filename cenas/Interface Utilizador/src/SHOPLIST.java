import java.util.ArrayList;

public class SHOPLIST {
    ArrayList<PRODUCT_TB> Shoplist = new ArrayList<>();
    int Price=0;


    public SHOPLIST(){}

    public void addSHOPLIST(PRODUCT_TB product){
        Shoplist.add(product);
        Price += product.type.Price;
    }

    public void removeSHOPLIST(PRODUCT_TB product){
        Shoplist.remove(product);
        Price -= product.type.Price;
    }

    public void resetSHOPLIST() {
        Shoplist.clear();
    }


}
