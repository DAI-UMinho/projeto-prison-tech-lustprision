package com.lustprision.admin.web.rest.errors;

public class PrisonerNumberAlredyUsed extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public PrisonerNumberAlredyUsed() {
        super("Numero de prisioneiro já é usado", "prisioner", "prisonerNum");
    }
}
