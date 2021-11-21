package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.Cuonsach;
import java.util.stream.Stream;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Cuonsach} entity.
 */
public interface CuonsachSearchRepository extends ElasticsearchRepository<Cuonsach, Long>, CuonsachSearchRepositoryInternal {}

interface CuonsachSearchRepositoryInternal {
    Stream<Cuonsach> search(String query);
}

class CuonsachSearchRepositoryInternalImpl implements CuonsachSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;

    CuonsachSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate) {
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Override
    public Stream<Cuonsach> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return elasticsearchTemplate.search(nativeSearchQuery, Cuonsach.class).map(SearchHit::getContent).stream();
    }
}
