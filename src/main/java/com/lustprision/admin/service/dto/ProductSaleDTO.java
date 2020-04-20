package com.lustprision.admin.service.dto;
import com.lustprision.admin.domain.PressProduct;
import com.lustprision.admin.domain.Prisioner;

public class ProductSaleDTO extends PressProductDTO {

    private String prisonerName;

    private Long purchaseID;

    private byte[] prisonerImage;

    private String prisonerImageContentType;

    public ProductSaleDTO(){}

    public ProductSaleDTO(PressProduct pressProduct){
        setId(pressProduct.getId());
        setPriceTotal(pressProduct.getPriceTotal());
        setProductID(pressProduct.getProduct());
        setQty(pressProduct.getQty());
        this.purchaseID = pressProduct.getPurchase().getId();
    }

    public String getPrisonerName(){ return prisonerName; }

    public void setPrisonerName(String prisonerName){ this.prisonerName = prisonerName; }

    public Long getPurchaseID(){ return purchaseID; }

    public void setPurchaseID(Long purchaseID){ this.purchaseID = purchaseID; }

    public byte[] getPrisonerImage() {
        return prisonerImage;
    }

    public void setPrisonerImage(byte[] prisonerImage) {
        this.prisonerImage = prisonerImage;
    }

    public String getPrisonerImageContentType() {
        return prisonerImageContentType;
    }

    public void setPrisonerImageContentType(String prisonerImageContentType) {
        this.prisonerImageContentType = prisonerImageContentType;
    }
}
