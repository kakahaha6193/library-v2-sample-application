package com.mycompany.myapp.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.mycompany.myapp.domain.Sach;
import com.mycompany.myapp.repository.SachRepository;
import com.mycompany.myapp.service.SachService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Sach}.
 */
@RestController
@RequestMapping("/api")
public class SachResource {

    private final Logger log = LoggerFactory.getLogger(SachResource.class);

    private static final String ENTITY_NAME = "sach";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SachService sachService;

    private final SachRepository sachRepository;

    public SachResource(SachService sachService, SachRepository sachRepository) {
        this.sachService = sachService;
        this.sachRepository = sachRepository;
    }

    /**
     * {@code POST  /saches} : Create a new sach.
     *
     * @param sach the sach to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sach, or with status {@code 400 (Bad Request)} if the sach has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/saches")
    public ResponseEntity<Sach> createSach(@RequestBody Sach sach) throws URISyntaxException {
        log.debug("REST request to save Sach : {}", sach);
        if (sach.getId() != null) {
            throw new BadRequestAlertException("A new sach cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sach result = sachService.save(sach);
        return ResponseEntity
            .created(new URI("/api/saches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /saches/:id} : Updates an existing sach.
     *
     * @param id the id of the sach to save.
     * @param sach the sach to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sach,
     * or with status {@code 400 (Bad Request)} if the sach is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sach couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/saches/{id}")
    public ResponseEntity<Sach> updateSach(@PathVariable(value = "id", required = false) final Long id, @RequestBody Sach sach)
        throws URISyntaxException {
        log.debug("REST request to update Sach : {}, {}", id, sach);
        if (sach.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sach.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sachRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Sach result = sachService.save(sach);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sach.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /saches/:id} : Partial updates given fields of an existing sach, field will ignore if it is null
     *
     * @param id the id of the sach to save.
     * @param sach the sach to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sach,
     * or with status {@code 400 (Bad Request)} if the sach is not valid,
     * or with status {@code 404 (Not Found)} if the sach is not found,
     * or with status {@code 500 (Internal Server Error)} if the sach couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/saches/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Sach> partialUpdateSach(@PathVariable(value = "id", required = false) final Long id, @RequestBody Sach sach)
        throws URISyntaxException {
        log.debug("REST request to partial update Sach partially : {}, {}", id, sach);
        if (sach.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sach.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sachRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Sach> result = sachService.partialUpdate(sach);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sach.getId().toString())
        );
    }

    /**
     * {@code GET  /saches} : get all the saches.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of saches in body.
     */
    @GetMapping("/saches")
    public ResponseEntity<List<Sach>> getAllSaches(Pageable pageable) {
        log.debug("REST request to get a page of Saches");
        Page<Sach> page = sachService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /saches/:id} : get the "id" sach.
     *
     * @param id the id of the sach to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sach, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/saches/{id}")
    public ResponseEntity<Sach> getSach(@PathVariable Long id) {
        log.debug("REST request to get Sach : {}", id);
        Optional<Sach> sach = sachService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sach);
    }

    /**
     * {@code DELETE  /saches/:id} : delete the "id" sach.
     *
     * @param id the id of the sach to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/saches/{id}")
    public ResponseEntity<Void> deleteSach(@PathVariable Long id) {
        log.debug("REST request to delete Sach : {}", id);
        sachService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * {@code SEARCH  /_search/saches?query=:query} : search for the sach corresponding
     * to the query.
     *
     * @param query the query of the sach search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/saches")
    public ResponseEntity<List<Sach>> searchSaches(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Saches for query {}", query);
        Page<Sach> page = sachService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
