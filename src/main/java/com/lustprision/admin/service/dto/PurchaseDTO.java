package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.Purchase;

import javax.validation.constraints.Size;
import java.time.Instant;

public class PurchaseDTO {

    @Size(max = 38)
    private Long id;

    private Instant date;

    private Double purchaseTotal;

    public PurchaseDTO() {
        // Empty constructor needed for Jackson.
    }

    public PurchaseDTO(Purchase purchase) {
        this.id = purchase.getId();
        this.date = purchase.getDate();
        this.purchaseTotal = purchase.getPurchaseTotal();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() { return date; }

    public void setDate(Instant date) { this.date = date; }

    public Double getPurchaseTotal() { return purchaseTotal; }

    public void setPurchaseTotal(Double purchaseTotal) { this.purchaseTotal = purchaseTotal; }

/*    public Long getPrisionerId() {
        return prisionerId;
    }

    public void setPrisionerId(Long prisionerId) {
        this.prisionerId = prisionerId;
    }*/
}
