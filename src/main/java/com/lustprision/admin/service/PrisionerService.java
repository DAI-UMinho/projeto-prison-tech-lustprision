package com.lustprision.admin.service;

import com.lustprision.admin.domain.PressWork;
import com.lustprision.admin.domain.PrisQuiz;
import com.lustprision.admin.domain.Purchase;
import com.lustprision.admin.domain.Work;
import com.lustprision.admin.repository.*;
import com.lustprision.admin.service.dto.PurchaseDTO;
import com.lustprision.admin.service.dto.QuizDTO;
import com.lustprision.admin.service.dto.UserDTO;
import com.lustprision.admin.service.dto.WorkDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class PrisionerService {

    private final Logger log = LoggerFactory.getLogger(PrisionerService.class);

    private final PrisionerRepository prisionerRepository;

    private final PurchaseRepository purchaseRepository;

    private final PressWorkRepository pressWorkRepository;

    private final PrisQuizRepository prisQuizRepository;

    public PrisionerService(PrisionerRepository prisionerRepository, PurchaseRepository purchaseRepository,
                            PressWorkRepository pressWorkRepository, PrisQuizRepository prisQuizRepository) {
        this.prisionerRepository = prisionerRepository;
        this.purchaseRepository = purchaseRepository;
        this.pressWorkRepository = pressWorkRepository;
        this.prisQuizRepository = prisQuizRepository;
    }

    public List<PurchaseDTO> getPrisionerPurchases(Long id) {
        List<PurchaseDTO> purchaseList = new ArrayList<>();
        prisionerRepository.findById(id).ifPresent(prisioner -> {
            purchaseRepository.findAllByPrisioner(prisioner)
                .forEach(purchase -> {
                    purchaseList.add(new PurchaseDTO(purchase));
                });
        });
        log.debug("REST request purchase list : {}", purchaseList);
        return purchaseList;
    }

    public List<WorkDTO> getPrisionerWork(Long id){
        List<WorkDTO> workList = new ArrayList<>();
        prisionerRepository.findById(id).ifPresent(prisioner -> {
            pressWorkRepository.getAllByPrisioner(prisioner)
                .stream()
                .map(PressWork::getWork)
                .forEach(work -> workList.add(new WorkDTO(work)));
        });
        return workList;
    }

    public List<QuizDTO> getPrisionerQuizs(Long id){
        List<QuizDTO> quizList = new ArrayList<>();
        prisionerRepository.findById(id).ifPresent(prisioner -> {
            prisQuizRepository.getAllByPrisioner(prisioner)
                .forEach(prisQuiz -> {
                    LocalDate quizDate = prisQuiz.getQuizDate();
                    QuizDTO mQuiz = new QuizDTO(prisQuiz.getQuiz());
                    mQuiz.setQuizDate(quizDate);
                    quizList.add(mQuiz);
                });
        });
        return quizList;
    }
}
