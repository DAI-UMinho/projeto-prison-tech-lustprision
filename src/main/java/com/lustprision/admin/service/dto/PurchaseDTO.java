package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.Purchase;

import javax.validation.constraints.Size;

public class PurchaseDTO {

    @Size(max = 38)
    private Long id;

    @Size(max = 38)
    private Long prisionerId;

    public PurchaseDTO() {
        // Empty constructor needed for Jackson.
    }

    public PurchaseDTO(Purchase purchase) {
        this.id = purchase.getId();
        this.prisionerId = purchase.getPrisioner().getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPrisionerId() {
        return prisionerId;
    }

    public void setPrisionerId(Long prisionerId) {
        this.prisionerId = prisionerId;
    }
}
