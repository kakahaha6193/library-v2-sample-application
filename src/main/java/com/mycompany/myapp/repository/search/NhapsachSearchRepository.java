package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.Nhapsach;
import java.util.stream.Stream;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Nhapsach} entity.
 */
public interface NhapsachSearchRepository extends ElasticsearchRepository<Nhapsach, Long>, NhapsachSearchRepositoryInternal {}

interface NhapsachSearchRepositoryInternal {
    Stream<Nhapsach> search(String query);
}

class NhapsachSearchRepositoryInternalImpl implements NhapsachSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;

    NhapsachSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate) {
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Override
    public Stream<Nhapsach> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return elasticsearchTemplate.search(nativeSearchQuery, Nhapsach.class).map(SearchHit::getContent).stream();
    }
}
