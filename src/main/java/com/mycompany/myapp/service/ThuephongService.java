package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Thuephong;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Thuephong}.
 */
public interface ThuephongService {
    /**
     * Save a thuephong.
     *
     * @param thuephong the entity to save.
     * @return the persisted entity.
     */
    Thuephong save(Thuephong thuephong);

    /**
     * Partially updates a thuephong.
     *
     * @param thuephong the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Thuephong> partialUpdate(Thuephong thuephong);

    /**
     * Get all the thuephongs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Thuephong> findAll(Pageable pageable);

    /**
     * Get the "id" thuephong.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Thuephong> findOne(Long id);

    /**
     * Delete the "id" thuephong.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the thuephong corresponding to the query.
     *
     * @param query the query of the search.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Thuephong> search(String query, Pageable pageable);
}
