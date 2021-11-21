package com.mycompany.myapp.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.mycompany.myapp.domain.Thuephong;
import com.mycompany.myapp.repository.ThuephongRepository;
import com.mycompany.myapp.repository.search.ThuephongSearchRepository;
import com.mycompany.myapp.service.ThuephongService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Thuephong}.
 */
@Service
@Transactional
public class ThuephongServiceImpl implements ThuephongService {

    private final Logger log = LoggerFactory.getLogger(ThuephongServiceImpl.class);

    private final ThuephongRepository thuephongRepository;

    private final ThuephongSearchRepository thuephongSearchRepository;

    public ThuephongServiceImpl(ThuephongRepository thuephongRepository, ThuephongSearchRepository thuephongSearchRepository) {
        this.thuephongRepository = thuephongRepository;
        this.thuephongSearchRepository = thuephongSearchRepository;
    }

    @Override
    public Thuephong save(Thuephong thuephong) {
        log.debug("Request to save Thuephong : {}", thuephong);
        Thuephong result = thuephongRepository.save(thuephong);
        thuephongSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<Thuephong> partialUpdate(Thuephong thuephong) {
        log.debug("Request to partially update Thuephong : {}", thuephong);

        return thuephongRepository
            .findById(thuephong.getId())
            .map(existingThuephong -> {
                if (thuephong.getNgayThue() != null) {
                    existingThuephong.setNgayThue(thuephong.getNgayThue());
                }
                if (thuephong.getCa() != null) {
                    existingThuephong.setCa(thuephong.getCa());
                }

                return existingThuephong;
            })
            .map(thuephongRepository::save)
            .map(savedThuephong -> {
                thuephongSearchRepository.save(savedThuephong);

                return savedThuephong;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Thuephong> findAll(Pageable pageable) {
        log.debug("Request to get all Thuephongs");
        return thuephongRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Thuephong> findOne(Long id) {
        log.debug("Request to get Thuephong : {}", id);
        return thuephongRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Thuephong : {}", id);
        thuephongRepository.deleteById(id);
        thuephongSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Thuephong> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Thuephongs for query {}", query);
        return thuephongSearchRepository.search(query, pageable);
    }
}
