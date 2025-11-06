#!/bin/bash

# Script de Deploy - Copa Pepeu Ranking
# Este script facilita o deploy e gerenciamento do container

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🏆 Copa Pepeu - Deploy Script${NC}"
echo ""

# Função para verificar se Docker está instalado
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker não está instalado!${NC}"
        echo "Por favor, instale o Docker: https://docs.docker.com/get-docker/"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}❌ Docker Compose não está instalado!${NC}"
        echo "Por favor, instale o Docker Compose: https://docs.docker.com/compose/install/"
        exit 1
    fi
    
    echo -e "${GREEN}✓ Docker e Docker Compose encontrados${NC}"
}

# Função para iniciar
start() {
    echo -e "${BLUE}🚀 Iniciando container...${NC}"
    docker-compose up -d
    echo -e "${GREEN}✓ Container iniciado com sucesso!${NC}"
    echo -e "${YELLOW}📍 Acesse: http://localhost:3000${NC}"
}

# Função para parar
stop() {
    echo -e "${BLUE}⏸️  Parando container...${NC}"
    docker-compose down
    echo -e "${GREEN}✓ Container parado${NC}"
}

# Função para rebuild
rebuild() {
    echo -e "${BLUE}🔨 Fazendo rebuild do container...${NC}"
    docker-compose down
    docker-compose up -d --build
    echo -e "${GREEN}✓ Rebuild concluído!${NC}"
    echo -e "${YELLOW}📍 Acesse: http://localhost:3000${NC}"
}

# Função para ver logs
logs() {
    echo -e "${BLUE}📋 Mostrando logs (Ctrl+C para sair)...${NC}"
    docker-compose logs -f
}

# Função para status
status() {
    echo -e "${BLUE}📊 Status do container:${NC}"
    docker-compose ps
}

# Função para atualizar dados
update_data() {
    echo -e "${BLUE}🔄 Atualizando dados...${NC}"
    if [ ! -f "titulos.csv" ]; then
        echo -e "${RED}❌ Arquivo titulos.csv não encontrado!${NC}"
        exit 1
    fi
    rebuild
}

# Menu principal
show_menu() {
    echo ""
    echo -e "${YELLOW}Escolha uma opção:${NC}"
    echo "1) Iniciar (start)"
    echo "2) Parar (stop)"
    echo "3) Rebuild"
    echo "4) Ver logs"
    echo "5) Ver status"
    echo "6) Atualizar dados"
    echo "0) Sair"
    echo ""
}

# Verificar Docker
check_docker

# Se receber argumento via linha de comando
if [ $# -gt 0 ]; then
    case "$1" in
        start)
            start
            ;;
        stop)
            stop
            ;;
        rebuild)
            rebuild
            ;;
        logs)
            logs
            ;;
        status)
            status
            ;;
        update)
            update_data
            ;;
        *)
            echo -e "${RED}Comando inválido: $1${NC}"
            echo "Uso: $0 {start|stop|rebuild|logs|status|update}"
            exit 1
            ;;
    esac
else
    # Menu interativo
    while true; do
        show_menu
        read -p "Digite sua opção: " choice
        case $choice in
            1)
                start
                ;;
            2)
                stop
                ;;
            3)
                rebuild
                ;;
            4)
                logs
                ;;
            5)
                status
                ;;
            6)
                update_data
                ;;
            0)
                echo -e "${GREEN}👋 Até logo!${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}Opção inválida!${NC}"
                ;;
        esac
    done
fi
