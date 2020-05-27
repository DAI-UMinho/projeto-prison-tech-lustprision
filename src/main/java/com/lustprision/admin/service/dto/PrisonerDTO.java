package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.Prisioner;
import java.time.Instant;
import java.time.LocalDate;

public class PrisonerDTO {
    private Long id;

    private String name;

    private Integer bi;

    private Integer numPrisioner;

    private Integer numCell;

    private LocalDate dataNascimento;

    private Double balance;

    private Integer working;

    private Integer nfcCode;

    private Integer codigoCartao;

    private String createdBy;

    private Instant createdDate = Instant.now();

    private String lastModifiedBy;

    private Instant lastModifiedDate = Instant.now();

    private String revType;

    public PrisonerDTO(){}

    public PrisonerDTO(Prisioner prisoner){
        this.id = prisoner.getId();
        this.name = prisoner.getName();
        this.bi = prisoner.getBi();
        this.numPrisioner = prisoner.getNumPrisioner();
        this.numCell = prisoner.getNumCell();
        this.dataNascimento = prisoner.getDataNascimento();
        this.balance = prisoner.getBalance();
        this.working = prisoner.getWorking();
        this.nfcCode = prisoner.getNfcCode();
        this.codigoCartao = prisoner.getCodigoCartao();
        this.createdBy = prisoner.getCreatedBy();
        this.createdDate = prisoner.getCreatedDate();
        this.lastModifiedBy = prisoner.getLastModifiedBy();
        this.lastModifiedDate = prisoner.getLastModifiedDate();
        this.revType = "MOD";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBi() {
        return bi;
    }

    public void setBi(Integer bi) {
        this.bi = bi;
    }

    public Integer getNumPrisioner() {
        return numPrisioner;
    }

    public void setNumPrisioner(Integer numPrisioner) {
        this.numPrisioner = numPrisioner;
    }

    public Integer getNumCell() {
        return numCell;
    }

    public void setNumCell(Integer numCell) {
        this.numCell = numCell;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Integer getWorking() {
        return working;
    }

    public void setWorking(Integer working) {
        this.working = working;
    }

    public Integer getNfcCode() {
        return nfcCode;
    }

    public void setNfcCode(Integer nfcCode) {
        this.nfcCode = nfcCode;
    }

    public Integer getCodigoCartao() {
        return codigoCartao;
    }

    public void setCodigoCartao(Integer codigoCartao) {
        this.codigoCartao = codigoCartao;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getRevType() {
        return revType;
    }

    public void setRevType(String revType) {
        this.revType = revType;
    }
}

