package com.lustprision.admin.service;

import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.domain.Product;
import com.lustprision.admin.domain.User;
import com.lustprision.admin.repository.PressWorkRepository;
import com.lustprision.admin.repository.WorkRepository;
import com.lustprision.admin.service.dto.PrisonerDTO;
import com.lustprision.admin.service.dto.WorkSubsDTO;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.AuditReaderFactory;
import org.hibernate.envers.RevisionType;
import org.hibernate.envers.query.AuditEntity;
import org.hibernate.envers.query.AuditQuery;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class AuditService {

    private final Logger log = LoggerFactory.getLogger(PrisionerService.class);

    private final WorkRepository workRepository;

    private final PressWorkRepository pressWorkRepository;

    @PersistenceContext
    private final EntityManager entityManager;

    private AuditReader reader;

    public AuditService(WorkRepository workRepository, PressWorkRepository pressWorkRepository, EntityManager entityManager){
        this.workRepository = workRepository;
        this.pressWorkRepository = pressWorkRepository;
        this.entityManager = entityManager;
    }

    public List<PrisonerDTO> getPrisonerLogs(Long id){
        reader = AuditReaderFactory.get(entityManager);
        List<PrisonerDTO> m = new ArrayList<>();
        AuditQuery query = reader.createQuery().forRevisionsOfEntity(Prisioner.class, false, true).addOrder(AuditEntity.revisionNumber().desc());

        ArrayList<Object[]> list = (ArrayList) query.getResultList();
        for(int i=0; i < list.size(); i++){
            Object[] triplet = list.get(i);
            Prisioner prisioner = (Prisioner) triplet[0];
            if(prisioner.getId().equals(id)){
                RevisionType revisionType = (RevisionType) triplet[2];
                PrisonerDTO dto = new PrisonerDTO(prisioner);
                dto.setRevType(revisionType.name());
                m.add(dto);
            }
        }
        return m;
    }
    
}
