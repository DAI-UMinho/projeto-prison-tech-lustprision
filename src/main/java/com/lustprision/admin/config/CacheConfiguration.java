package com.lustprision.admin.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.lustprision.admin.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.lustprision.admin.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.lustprision.admin.domain.User.class.getName());
            createCache(cm, com.lustprision.admin.domain.Authority.class.getName());
            createCache(cm, com.lustprision.admin.domain.User.class.getName() + ".authorities");
            createCache(cm, com.lustprision.admin.domain.Prisioner.class.getName());
            createCache(cm, com.lustprision.admin.domain.Prisioner.class.getName() + ".idPrisioners");
            createCache(cm, com.lustprision.admin.domain.PressWork.class.getName());
            createCache(cm, com.lustprision.admin.domain.PrisQuiz.class.getName());
            createCache(cm, com.lustprision.admin.domain.QuestionQuiz.class.getName());
            createCache(cm, com.lustprision.admin.domain.PressProduct.class.getName());
//            createCache(cm, com.lustprision.admin.domain.Work.class.getName());
//            createCache(cm, com.lustprision.admin.domain.Work.class.getName() + ".idWorks");
            createCache(cm, com.lustprision.admin.domain.Quiz.class.getName());
            createCache(cm, com.lustprision.admin.domain.Quiz.class.getName() + ".idQuizs");
            createCache(cm, com.lustprision.admin.domain.Quiz.class.getName() + ".idQuzs");
            createCache(cm, com.lustprision.admin.domain.Question.class.getName());
            createCache(cm, com.lustprision.admin.domain.Question.class.getName() + ".idQuestions");
            createCache(cm, com.lustprision.admin.domain.Purchase.class.getName());
            createCache(cm, com.lustprision.admin.domain.Purchase.class.getName() + ".idPurchases");
            createCache(cm, com.lustprision.admin.domain.Product.class.getName());
            createCache(cm, com.lustprision.admin.domain.Product.class.getName() + ".codeProds");
            createCache(cm, com.lustprision.admin.domain.Prisioner.class.getName() + ".ids");
//            createCache(cm, com.lustprision.admin.domain.Work.class.getName() + ".ids");
            createCache(cm, com.lustprision.admin.domain.Quiz.class.getName() + ".ids");
            createCache(cm, com.lustprision.admin.domain.Question.class.getName() + ".ids");
            createCache(cm, com.lustprision.admin.domain.Purchase.class.getName() + ".ids");
            createCache(cm, com.lustprision.admin.domain.Product.class.getName() + ".ids");
            createCache(cm, com.lustprision.admin.domain.PressProduct.class.getName());
            createCache(cm, com.lustprision.admin.domain.State.class.getName());
            createCache(cm, com.lustprision.admin.domain.Seller.class.getName());
            createCache(cm, com.lustprision.admin.domain.Seller.class.getName() + ".products");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

}
